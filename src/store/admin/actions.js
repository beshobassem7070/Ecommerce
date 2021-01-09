import * as firebase from "firebase";

export default {
  submitCategoryForm({ commit, state }, category) {
    return firebase
      .firestore()
      .collection("categories")
      .add(category)
      .then((queryDoc) => {
        commit(
          "updataCategories",
          state.categories.concat(
            Object.assign({}, category, { id: queryDoc.id })
          )
        );
      });
  },
  submitEditCategoryForm({ commit, state }, { documentRef, category }) {
    return firebase
      .firestore()
      .collection("categories")
      .doc(documentRef)
      .update(category)
      .then(() => {
        commit(
          "updataCategories",
          state.categories.map((cat) => {
            if (cat.id == documentRef) {
              return Object.assign({}, cat, category);
            }
            return cat;
          })
        );
      });
  },
  getCategories({ commit }) {
    firebase
      .firestore()
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        let categories = querySnapshot.docs.map((queryDoc) =>
          Object.assign({}, queryDoc.data(), {
            id: queryDoc.id,
          })
        );
        commit("updataCategories", categories);
      });
  },
  deleteCategory({ commit, state }, categoryId) {
    return firebase
      .firestore()
      .collection("categories")
      .doc(categoryId)
      .delete()
      .then(() => {
        commit(
          "updataCategories",
          state.categories.filter((category) => category.id != categoryId)
        );
      });
  },
};
