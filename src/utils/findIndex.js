export default function search(arr, index){
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === index) {
        return i;
        }
    }
}