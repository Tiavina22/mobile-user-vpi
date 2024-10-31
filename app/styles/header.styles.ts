import { StyleSheet } from "react-native"

export const HeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        height: 60,
        marginTop: 45,
        backgroundColor: "#OOffOO", 
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff", 
        marginLeft: 10, 
    },
    icon: {
        marginRight: 10, 
        color: "#fff",
    },
})