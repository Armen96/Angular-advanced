import {CoreFirestoreModel} from "../firestore.model";

/**
 * Firestore users collection
 */
export class UserModel extends CoreFirestoreModel {
  /**
   * Constructor
   */
  constructor() {
    super("users");
  }

  /**
   * Get user data
   *
   * @param email user ID
   */
  async getUser(email: any) {
    const user = await this.find(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
