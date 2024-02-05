declare module '@cheprasov/qrcode' {
  export interface QRCodeOptions {
    text: string;
    width?: number;
    height?: number;
    color?: string;
    background?: string;
    ecl?: 'L' | 'M' | 'Q' | 'H';
  }

  export interface QRCode {
    make(): void;
    toDataURL(): string;
    toBuffer(): Buffer;
  }

  export function createQRCode(options: QRCodeOptions): QRCode;

  export interface QRCodeCanvasOptions {
    text: string;
    width?: number;
    height?: number;
    color?: string;
    background?: string;
    ecl?: 'L' | 'M' | 'Q' | 'H';
  }

  export class QRCodeCanvas {
    constructor(options: string);
    toDataUrl(): string;
    toBuffer(): Buffer;
  }
}
