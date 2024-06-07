import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ADMIN_SDK } from '../../constants';


initializeApp({
    credential: cert(ADMIN_SDK)
});

const firestore = getFirestore();

export default firestore;