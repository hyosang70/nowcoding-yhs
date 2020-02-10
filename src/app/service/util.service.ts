import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public XMLToString(oXML) {
    if (this.checkIe()) {
      const oString = oXML.xml;
      return oString;
    } else {
      return (new XMLSerializer()).serializeToString(oXML);
    }
  }
  public checkIe() {
    const ua = navigator.userAgent;
    const result = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return result;
  }
  public async loadExternalScriptArray(scriptUrls: Array<string>) {
    const promises = [];
    scriptUrls.forEach(src => {
      promises.push(this.loadExternalScript(src));
    });
    const results = await Promise.all(promises);
    return results;
  }
  public loadExternalScript(scriptUrl: string){
    return new Promise(resolve => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  public loadExternalStyles(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement('link');
      styleElement.href = styleUrl;
      styleElement.onload = resolve;
      document.head.appendChild(styleElement);
    });
  }
}
