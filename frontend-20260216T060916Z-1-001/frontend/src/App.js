import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-10 via-blue-50 to-indigo-100 overflow-x-hidden">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.03"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurre d"
              scale="140"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <PipelineToolbar />

      <div className="pt-28">
        <PipelineUI />
        <div className="mt-8 flex justify-center">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;