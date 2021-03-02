import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private fs: AngularFirestore, private fireStorage: AngularFireStorage) { }

  getAllGoods() {
    return this.fs.collection('goods').snapshotChanges();
  }

  addNewGood(name, price, image) {
    return new Promise((resolve, reject) => {
      const ref = this.fireStorage.ref('/goods/' + image.name);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe(photoUrl => {
          this.fs.collection('goods').add({
            name, price, photoUrl
          }).then(() => resolve('saved'));
        });
      });
    });
  }
}
