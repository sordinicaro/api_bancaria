
import firestore from "./database";
import { getSHA512OfPassword } from "../utils/password-hasher";
import { getToken } from "../utils/jwt";


abstract class UserModel {
    static async createNew(userData: any) {
        const { fullname, email, password } = userData
        const hashedPassword = getSHA512OfPassword(password);
        const newUser = await firestore.collection('users').add({
            fullname,
            email,

            movements: [],
            balance: 0,
        });
        await firestore.collection('auths').doc(newUser.id).set({
            password: hashedPassword,
        });

        return {
            message: `User ${fullname} created successfilly, id: ${newUser.id} `
        };
    }

    static async getInfo(userId: string) {

        const userSnapshot = await firestore
            .collection('users')
            .doc(userId)
            .get();
        const userInfo = userSnapshot.data();

        return { userInfo };

    }

    static async login(userCredencials: any) {
        const { email, password } = userCredencials;

        const userQuerySnapshot = await firestore
            .collection('users')
            .where('email', '==', email).get();

        const userId = userQuerySnapshot.docs[0].id;

        const auth = (await firestore.collection('auths').doc(userId).get()) as any;
        const dbHashedPassword = auth.data().password;

        const hashedPassword = getSHA512OfPassword(password);

        if (hashedPassword == dbHashedPassword) {
            const token = getToken({ email, userId });

            return {
                menssage: 'User logger sussefully!',
                token,
            };
        }

        return { error: 'Wrong credentials' };

    }
}
export default UserModel;


