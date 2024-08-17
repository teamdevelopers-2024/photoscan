declare module 'jquery' {
    interface JQuery<TElement = HTMLElement> {
      slick(options?: any): JQuery<TElement>;
    }
  }