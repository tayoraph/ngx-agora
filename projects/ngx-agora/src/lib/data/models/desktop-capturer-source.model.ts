/**
 * This interface contains information on the screen source
 * @see [DesktopCapturerSource](https://electronjs.org/docs/api/structures/desktop-capturer-source).
 */
export interface DesktopCapturerSource {
  /** ID of the screen source. */
  id: string;
  /** Name of the screen source. */
  name: string;
  /** Thumbnail of the screen source.
   * @see [nativeImage](https://electronjs.org/docs/api/native-image#nativeimage) for supported types.
   */
  thumbnail: any;
}
