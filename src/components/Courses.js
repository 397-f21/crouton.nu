import { topoSort } from "../utils/topoSort"

export const Courses = () => {
    return (
        <button onClick={() => topoSort([], [])}>
            Hello
        </button>
    )

}