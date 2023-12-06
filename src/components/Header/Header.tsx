import { FC, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Menu from '../../../public/assets/menu.png'
import Drone from '../../../public/assets/dronetop.png'
import Line from '../../../public/assets/line.png'
import styles from './Header.module.scss'

interface IHeaderProps {
    pagePosition: number
    setPagePosition: (pagePosition: number) => void
}

const Header: FC<IHeaderProps> = ({ pagePosition, setPagePosition }) => {
    const headerRef = useRef<HTMLElement>(null)
    const transition = { type: 'ease in', duration: 1, delay: 2 }
    useEffect(() => {
        headerRef.current && headerRef.current.addEventListener('wheel', (e: WheelEvent) => e.deltaY > 0 && headerRef.current && setPagePosition(headerRef.current.scrollHeight))
        document.addEventListener('keydown', (e: KeyboardEvent) => e.key === 'ArrowDown' && headerRef.current && setPagePosition(headerRef.current.scrollHeight))
        window.addEventListener('resize', () => pagePosition > 0 && headerRef.current && setPagePosition(headerRef.current.scrollHeight))
    }, [])
    return (
        <motion.header
            ref={headerRef}
            className={styles.header}
            initial={{ y: 0 }}
            animate={{ y: -pagePosition }}
            transition={{ type: 'ease-in', delay: 0.5, duration: 2 }}
        >
            <nav className={styles.nav}>
                <motion.button
                    className={styles.menuBtn}
                    initial={{ x: 150 }}
                    animate={{ x: 0 }}
                    transition={transition}
                >
                    <Image src={Menu} alt='menu icon' width={32} height={32} priority />
                </motion.button>
            </nav>
            <section className={styles.advSection}>
                <motion.div
                    className={styles.lineVer}
                    initial={{ opacity: 0, scaleY: 0.5 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={transition}
                >
                    <Image src={Line} alt='line' width={70} height={250} priority />
                </motion.div>
                <motion.div
                    className={styles.lineVer}
                    initial={{ opacity: 0, scaleY: 0.5, rotateY: 180 }}
                    animate={{ opacity: 1, scaleY: 1, rotateY: 180 }}
                    transition={transition}
                >
                    <Image src={Line} alt='line' width={70} height={250} priority />
                </motion.div>
                <div className={styles.textContainer}>
                    <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={transition}
                    >the future is here
                    </motion.h4>
                    <motion.div
                        className={styles.brandName}
                        initial={{ y: 100, scale: 0.85 }}
                        animate={{ y: 0, scale: 1 }}
                        transition={transition}
                    >
                        <h1>airark</h1>
                        <motion.div
                            className={styles.lineHor}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={transition}
                        />
                    </motion.div>
                    <motion.h3
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={transition}>
                        airark the future of urban air mobility
                    </motion.h3>
                    <motion.button
                        className={styles.orderBtn}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={transition}>
                        pre-order
                        <span>pre-order</span>
                    </motion.button>
                </div>
                <motion.div
                    className={styles.drone}
                    initial={{ y: 100, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={transition}
                >
                    <Image src={Drone} alt='drone model' width={1750} height={1750} priority />
                </motion.div>
            </section>
        </motion.header>
    );
};

export default Header;
