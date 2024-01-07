import { ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';

const profile = () => {
  return (
    <motion.div
      className='bg-secondary w-[80%] h-[30%] justify-center flex gap-8 flex-row place-self-center rounded-lg place-items-center'
    >
      <ShieldExclamationIcon className='h-24 w-24 text-accent' />
      <div className='text-text font-bold text-[50px]'>
        Work in Progress
      </div>
    </motion.div>
  )
}

export default profile