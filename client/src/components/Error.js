import {AiOutlineWarning} from "react-icons/ai"

export default function Error({error}) {
    return (
        <div className="p-5 mx-auto mt-10 w-64 h-64 border-2 flex flex-col justify-center items-center rounded-lg overflow-hidden bg-red-100 border-red-400 shadow-xl dark:bg-slate-700 dark:text-white">
            <AiOutlineWarning className="block h-24 w-24 mb-5"/>
            <h3 className="font-eczar text-xl font-semibold mx-1/2 text-center">
                { error }             
            </h3>
        </div>
    )
}