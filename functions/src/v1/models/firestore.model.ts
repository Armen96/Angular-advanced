const defaultAdmin = require("firebase-admin");

/**
 * Base model for Firestore collections
 */
export class CoreFirestoreModel {
  // @ts-ignore
  private _parent: any;
  private readonly _collection: string;
  private readonly adminInstance: any;

  /**
   *
   * @param {string} collection - Firestore collection key
   * @param parent
   */
  constructor(collection: string, parent = null) {
    if (parent) {
      this._parent = parent;
      this._collection = parent + "/" + collection;
    } else {
      this._collection = collection;
    }
    this.adminInstance = defaultAdmin;
  }

  /**
   * Get the admin SDK
   *
   * @return {admin}
   */
  admin() {
    return this.adminInstance;
  }

  /**
   * Finds an individual Firestore document
   *
   * @param {string} id - Firestore document ID
   * @return {Promise<any>}
   */
  find(id: string) {
    return this.query().doc(id).get().then((doc: any) => this.docFromRef(doc));
  }

  /**
   * Get the Firestore collection (Firebase Admin SDK)
   * @return {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>}
   */
  collection() {
    return this.admin().firestore().collection(this._collection);
  }

  /**
   * Alias for collection()
   *
   * @return {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>}
   */
  query() {
    return this.collection();
  }

  /**
   * Query the collection for a single document
   *
   * @param {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>} query - Firestore query
   * @return {Promise<any>}
   */
  fetchOne(query: any) {
    return query.get().then((snap: { docs: string | any[]; }) => {
      if (snap.docs.length === 0) {
        return null;
      }
      return this.docFromRef(snap.docs[0]);
    });
  }

  /**
   * Query the collection for multiple documents
   *
   * @param {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>} query - Firestore query
   * @return {Promise<any[]>}
   */
  fetchAll(query = null) {
    if (!query) {
      query = this.query();
    }

    // @ts-ignore
    return query.get().then((snap) => {
      if (snap.docs.length === 0) {
        return null;
      }
      return snap.docs.map((docSnap: { exists: any; data: () => any; id: any; }) => this.docFromRef(docSnap));
    });
  }

  /**
   * Create a new document
   *
   * @param {any} data - The document data
   * @return {Promise<any>}
   */
  create(data: any) {
    if (data.id) {
      const id = data.id;
      const doc = {...data};
      delete doc.id;
      return this.collection().doc(id).set(doc).then(() => data);
    }
    return this.collection().add(data).then((snap: { id: any; }) => Object.assign(data, {id: snap.id}));
  }

  /**
   * Update an existing document
   *
   * @param {string} id - the Firestore document ID
   * @param {any} data - data to update
   * @param {object} options - update options
   * @return {Promise<any>}
   */
  update(id: string, data: any, options = {merge: true}) {
    return this.collection().doc(id).set(data, options).then(() => this.find(id));
  }

  /**
   * Delete an existing document or array of documents
   *
   * @param {object[]|string[]|object|string} ref - the document(s) to delete
   * @return {Promise<FirebaseFirestore.WriteResult>|Promise<FirebaseFirestore.WriteResult[]>}
   */
  deleteRecord(ref: any): any {
    if (Array.isArray(ref)) {
      return Promise.all(ref.map((doc) => this.deleteRecord(doc)));
    }
    const id = typeof ref === "object" ? ref.id : ref;
    return this.collection().doc(id).delete();
  }

  /**
   * Map a Firestore document to a simple object
   * @param docRef
   */
  docFromRef(docRef: { exists: any; data: () => any; id: any; }) {
    if (!docRef || !docRef.exists) {
      return null;
    }
    const data = docRef.data();
    data.id = docRef.id;
    return data;
  }

  /**
   * Get map data
   *
   * @param snap
   */
  mapCollection(snap: { docs: any[]; }) {
    if (snap.docs.length === 0) {
      return null;
    }
    return snap.docs.map((docSnap) => {
      return this.docFromRef(docSnap);
    }).filter((d) => !!d);
  }
}
