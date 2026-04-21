import { Gnb } from '@/shared/components/Gnb';
import { Footer } from '@/shared/components/Footer';

export class Layout {
  private static gnb: Gnb | null = null;

  static mount(): void {
    const gnbMount = document.getElementById('gnb-mount');
    const footerMount = document.getElementById('footer-mount');

    if (!gnbMount || !footerMount) {
      throw new Error('레이아웃 마운트 포인트를 찾을 수 없습니다');
    }

    Layout.gnb = new Gnb();
    gnbMount.appendChild(Layout.gnb.render());
    footerMount.appendChild(new Footer().render());
  }

  static unmount(): void {
    Layout.gnb?.destroy();
    Layout.gnb = null;
  }
}
