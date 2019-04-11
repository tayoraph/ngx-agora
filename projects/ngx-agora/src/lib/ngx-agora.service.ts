import { Inject, Injectable } from '@angular/core';
import * as AgoraRTC from 'agora-rtc-sdk';

import { AgoraClient } from './data/models/agora-client.model';
import { AgoraConfig } from './data/models/agora-config.model';
import { Device } from './data/models/device.model';
import { ClientConfig } from './data/models/exports';

@Injectable({
  providedIn: 'root'
})
export class NgxAgoraService {
  client: AgoraClient;
  audioDevices: Device[];
  videoDevices: Device[];

  constructor(@Inject('config') private config: AgoraConfig) {}

  checkSystemRequirements() {
    return AgoraRTC.checkSystemRequirements();
  }

  createClient(config: ClientConfig): void {
    this.client = AgoraRTC.createClient(config);
    this.client.init(this.config.AppID);
  }

  createStream(
    streamID: any,
    audio: boolean,
    cameraId: string = this.videoDevices[0].deviceId,
    microphoneId: string = this.audioDevices[0].deviceId,
    video: boolean,
    screen: boolean
  ) {
    return AgoraRTC.createStream({ streamID, audio, cameraId, microphoneId, video, screen });
  }

  logger(type: 'error' | 'warning' | 'info' | 'debug', message: string): void {
    switch (type) {
      case 'warning':
        AgoraRTC.Logger.warning(message);
        break;
      case 'info':
        AgoraRTC.Logger.info(message);
        break;
      case 'debug':
        AgoraRTC.Logger.debug(message);
        break;
      case 'error':
      default:
        AgoraRTC.Logger.error(message);
    }
  }

  private getDevices(): void {
    AgoraRTC.getDevices((devices: Device[]) => {
      const audioDevices = devices.filter(device => {
        return device.kind === 'audioinput' && device.deviceId !== 'default';
      });

      const videoDevices = devices.filter(device => {
        return device.kind === 'videoinput' && device.deviceId !== 'default';
      });

      this.audioDevices = audioDevices;
      this.videoDevices = videoDevices;
    });
  }
}
