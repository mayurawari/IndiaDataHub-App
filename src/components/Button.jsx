

export const Button = ({Text,onClick}) => {
  return (
    <div>
        <button className='text-xl px-3 py-2 border-0 rounded-2xl bg-black hover:bg-gray-800 text-white font-medium' onClick={onClick}>{Text}</button>
    </div>
  )
}
