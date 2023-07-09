import Lottie from 'react-lottie';

export default function Loading() {
  return (
    <div className='grid-rows grid h-full w-full place-items-center justify-center'>
      <Lottie options={{ loop: true, autoplay: true, animationData: require('~/lottie/loading.json') }} height={400} width={400}/>
    </div>
  );
}