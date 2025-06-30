const BudgetLoading = () => {
  return (
    <>
      {/* Floating Circles Animation - Background Only */}
      <div className="absolute inset-0 bottom-0 overflow-hidden pointer-events-none">
        {/* Circle 1 */}
        <div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-500/20 animate-float-up"
          style={{
            left: '25%',
            bottom: '-150px',
            animationDelay: '0s',
            animationDuration: '20s',
          }}
        />

        {/* Circle 2 */}
        <div
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-purple-300/40 to-purple-500/30 animate-float-up"
          style={{
            left: '10%',
            bottom: '-150px',
            animationDelay: '2s',
            animationDuration: '9s',
          }}
        />

        {/* Circle 3 */}
        <div
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-indigo-300/35 to-indigo-500/25 animate-float-up"
          style={{
            left: '70%',
            bottom: '-150px',
            animationDelay: '4s',
            animationDuration: '20s',
          }}
        />

        {/* Circle 4 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-pink-300/30 to-pink-500/20 animate-float-up"
          style={{
            left: '40%',
            bottom: '-150px',
            width: '60px',
            height: '60px',
            animationDelay: '0s',
            animationDuration: '15s',
          }}
        />

        {/* Circle 5 */}
        <div
          className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-cyan-300/40 to-cyan-500/30 animate-float-up"
          style={{
            left: '65%',
            bottom: '-150px',
            animationDelay: '0s',
            animationDuration: '20s',
          }}
        />

        {/* Circle 6 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-violet-300/25 to-violet-500/15 animate-float-up"
          style={{
            left: '75%',
            bottom: '-150px',
            width: '110px',
            height: '110px',
            animationDelay: '3s',
            animationDuration: '20s',
          }}
        />

        {/* Circle 7 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 animate-float-up"
          style={{
            left: '35%',
            bottom: '-150px',
            width: '150px',
            height: '150px',
            animationDelay: '7s',
            animationDuration: '20s',
          }}
        />

        {/* Circle 8 */}
        <div
          className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300/35 to-emerald-500/25 animate-float-up"
          style={{
            left: '50%',
            bottom: '-150px',
            animationDelay: '15s',
            animationDuration: '45s',
          }}
        />

        {/* Circle 9 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-orange-300/40 to-orange-500/30 animate-float-up"
          style={{
            left: '20%',
            bottom: '-150px',
            width: '15px',
            height: '15px',
            animationDelay: '2s',
            animationDuration: '35s',
          }}
        />

        {/* Circle 10 */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-rose-300/25 to-rose-500/15 animate-float-up"
          style={{
            left: '85%',
            bottom: '-150px',
            width: '150px',
            height: '150px',
            animationDelay: '0s',
            animationDuration: '11s',
          }}
        />
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-500px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </>
  );
};

export default BudgetLoading;
