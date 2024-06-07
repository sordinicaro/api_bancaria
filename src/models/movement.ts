
import firestore from "./database";


abstract class MovementModel {
    static async createNew(movementData: any) {
        const { userId, amount, tags, transactionType } = movementData;
        const timestamp = new Date().toISOString();
        const movement = { timestamp, transactionType, amount, tags };

        const userRef = firestore.collection('users').doc(userId);
        const userSnapshot = await userRef.get();
        const userData = userSnapshot.data();
        const { movements } = userData as any;
        let { balance } = userData as any;

        if (transactionType === "income") balance += amount;
        if (transactionType === "outcome") balance -= amount;

        movements.push(movement);

        const res = await userRef.set(
            {
                movements,
                balance,
            },
            { merge: true }
        );

        return "res";


    }

    static async getAll(userId: string) {
        const userRef = firestore.collection('users').doc(userId);
        const userSnapshot = await userRef.get();
        const userData = userSnapshot.data();
        const { balance, movements } = userData as any



        return { balance, movements };
    }
}

export default MovementModel;


