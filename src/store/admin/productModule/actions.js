import * as firebase from "firebase";

const generateFileName = (file) => `${file.lastModified}_${file.name}`;

const uploadToStorage = (file) => {
  const fileRef = firebase
    .storage()
    .ref(`products/filename/${generateFileName(file)}`);
  return fileRef.put(file).then((res) => res.ref.getDownloadURL());
};

export default {
  submitProductForm({ commit, state }, { product, imageFile }) {
    return uploadToStorage(imageFile).then((imageUrl) => {
      return firebase
        .firestore()
        .collection("products")
        .add({ ...product, imageUrl })
        .then((queryDoc) => {
          commit(
            "updataProducts",
            state.products.concat(
              Object.assign({}, { ...product, imageUrl }, { id: queryDoc.id })
            )
          );
        });
    });
  },
  sumbitEditProductForm(
    { commit, state },
    { product, documentRef, imageFile }
  ) {
    const uploadImage = imageFile
      ? uploadToStorage(imageFile)
      : Promise.resolve(null);
    return uploadImage.then((imageUrl) => {
      const productObj = { ...product };
      if (imageUrl) productObj["imageUrl"] = imageUrl;
      return firebase
        .firestore()
        .collection("products")
        .doc(documentRef)
        .update(productObj)
        .then(() => {
          commit(
            "updataProducts",
            state.products.map((product) => {
              if (product.id == documentRef) {
                return Object.assign({}, product, productObj);
              }
              return product;
            })
          );
        });
    });
  },
  getProducts({ commit }) {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((querySnapshot) => {
        let products = querySnapshot.docs.map((queryDoc) =>
          Object.assign({}, queryDoc.data(), {
            id: queryDoc.id,
          })
        );
        commit("updataProducts", products);
      });
  },
  deleteProduct({ commit, state }, productId) {
    return firebase
      .firestore()
      .collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        commit(
          "updataProducts",
          state.products.filter((product) => product.id != productId)
        );
      });
  },
};
