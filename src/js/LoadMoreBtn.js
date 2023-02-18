export default class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.btn = this.getBtn(selector);
    if (isHidden) this.hide();
    else this.show();
  }

  getBtn(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.btn.classList.add('hidden');
  }

  show() {
    this.btn.classList.remove('hidden');
  }

  disable() {
    this.btn.disabled = true;
    this.btn.textContent = 'Loading';
  }
  enable() {
    this.btn.disabled = false;
    this.btn.textContent = 'Load more';
  }
}
