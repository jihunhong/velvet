import { FC } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  withText?: boolean
}

const Logo: FC<LogoProps> = ({ className = '', size = 'md', withText = false }) => {
  const sizeScale = {
    sm: 0.4,
    md: 0.7,
    lg: 1
  }

  return (
    <div 
      className={`flex items-center ${withText ? 'gap-2' : ''} ${className}`}
      style={{ transform: `scale(${sizeScale[size]})` }}
    >
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <span className="text-white text-lg">₩</span>
      </div>
      {withText && <span className="text-xl font-bold">Velvet</span>}
    </div>
  )
}

export default Logo 