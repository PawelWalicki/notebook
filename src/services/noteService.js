import { onValue, push, ref, set, update } from "firebase/database"
import { auth, db } from "../firebase"


export const addNote = (noteItem) => {
    const user = auth.currentUser
    if (!user) {
        console.error("User not logged in!")
        return
    }

    const uid = user.uid
    const notesRef = ref(db, `notes/${uid}`)
    const newNoteRef = push(notesRef)
    set(newNoteRef, {
        ...noteItem,
        createdAt: new Date().toISOString()
    })
        .then(() => {
            console.log("Added!")
        }).catch(e => {
            console.error(e)
        })
}

export const getNote = (setNotes) => {
    const user = auth.currentUser
    if (!user) {
        console.log("User not logged in!")
        return
    }
    const uid = user.uid
    const notesRef = ref(db, `notes/${uid}`)
    onValue(notesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
            const notesArray = Object.keys(data).map((key) => (({ id: key, ...data[key] })))
            setNotes(notesArray)
        }
    })
}

export const editNoteText = (noteId, noteText) => {
    const user = auth.currentUser
    if (!user) {
        console.log("User not logged in!")
        return
    }
    const uid = user.uid
    const notesRef = ref(db, `notes/${uid}/${noteId}`)
    update(notesRef, {text:noteText})
    .then(() => console.log("Success!!"))
    .catch(() => "Error while editing note!")

}