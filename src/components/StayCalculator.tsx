import Stays from "./Stays"

export default function StayCalculator() {
  return (
    <div className="h-screen pt-10 flex flex-col gap-4 items-center">
      <span className="prose text-center">
        <h1>Stay Calculator</h1>
      </span>
      <Stays />
    </div>
  )
}
