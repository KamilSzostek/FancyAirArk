import { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'
import Image from 'next/image';
import Arrow from '../../../public/assets/arrow.png'
import { models, dronesGallery } from '@/helpers/dronesData';
import styles from './Main.module.scss'


interface IMainProps {
    pagePosition: number
    setPagePosition: (pagePosition: number) => void
}
const Main: FC<IMainProps> = ({ pagePosition, setPagePosition }) => {
    const [selectedModel, setSelectedModel] = useState(dronesGallery[1].id)
    const mainRef = useRef<HTMLElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const selectedImageRef = useRef<HTMLImageElement>(null)
    useEffect(() => {
        mainRef.current && mainRef.current.addEventListener('wheel', (e: WheelEvent) => e.deltaY < 0 && setPagePosition(0))
        document.addEventListener('keyup', (e: KeyboardEvent) => e.key === 'ArrowUp' && setPagePosition(0))
    }, [])

    const selectModel = (e: React.MouseEvent<HTMLLIElement>) => {
        if (selectedModel !== e.currentTarget.innerText.toLowerCase()) {
            setSelectedModel(e.currentTarget.innerText)
            selectedImageRef.current && selectedImageRef.current.classList.add(styles.fade)
            setTimeout(() => { selectedImageRef.current && selectedImageRef.current.classList.remove(styles.fade) }, 1000)
        }
    }

    const listElements = models.map((model, key) => (<li key={key} className={selectedModel.toLowerCase() === model ? styles.active : ''} onClick={selectModel}>{model}</li>))
    const selectedImage = dronesGallery.find(drone => selectedModel.toLowerCase() === drone.id)
    const selectedImageElement = selectedImage ? <Image ref={selectedImageRef} src={selectedImage.src} alt={selectedImage.alt} width={1200} height={1200} priority/> : null
    const selectedModelIndex = selectedImage ? dronesGallery.findIndex((drone) => drone.id === selectedImage.id) : 1
    return (
        <motion.main
            ref={mainRef}
            className={styles.main}
            initial={{ y: 0 }}
            animate={{ y: -pagePosition - 25 }}
            transition={{ type: 'ease-in', delay: 0.5, duration: 2 }}>
            <h1>airark</h1>
            <section className={styles.presentation}>
                <aside className={styles.models}>
                    <ul>
                        {listElements}
                    </ul>
                </aside>
                <div className={styles.gallery}>
                    <div className={styles.images}>
                        {selectedImageElement}
                    </div>
                    <div className={styles.progressBar}>
                        <div ref={barRef} className={styles.bar}>
                            <motion.div
                                className={styles.fill}
                                style={{ width: `${barRef.current ? barRef.current.clientWidth / dronesGallery.length * (selectedModelIndex + 1) : 0}px` }} />
                        </div>
                        {selectedImage ? <span>{selectedModelIndex + 1}/{dronesGallery.length}</span> : null}
                    </div>
                </div>
                <h2>
                    the future is here
                    <div>airark</div>
                </h2>
            </section>
            <motion.div
                className={styles.arrow}
                animate={{ y: [0, -50, 0, -75, 0] }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0
                }}
            >
                <span>order now</span>
                <Image src={Arrow} alt='arrow' height={100} width={15} priority />
            </motion.div>
        </motion.main>
    );
};

export default Main;
