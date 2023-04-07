import { Observable, Subscriber } from 'rxjs';

export class ConvertToBase64 {
  public convertToBase64(file: File) {
    return new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }

  private readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }
}
