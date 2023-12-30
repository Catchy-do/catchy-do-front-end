import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor() {}

  createStyleLink() {
    let link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'assets/css/style.css');
    document.head.appendChild(link);
  }
}
