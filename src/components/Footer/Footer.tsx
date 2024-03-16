import Image from 'next/image'

import chPlay from '../../assets/ch-play.png';
import appstore from '../../assets/appstore.png';
import qrCode from '../../assets/qr-code.png';

export const Footer: React.FC = () => {
    return (
        <footer className="flex justify-between bg-[#000] text-white py-[80px] px-24 w-full">
            <div className="flex-[0_0_15%]">
                <p className='text-2xl font-bold mb-6'>
                    Exclusive
                </p>
                <p className='text-xl font-medium mb-6'>
                    Subscribe
                </p>
                <p className='font-normal text-base'>
                    Get 10% off your first order
                </p>
            </div>
            <div className="flex-[0_0_15%]">
                <p  className='text-xl font-medium mb-6'>
                Support
                </p>
                <p className='font-normal text-base mb-4'>
                111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.
                </p>
                <p  className='font-normal text-base mb-4'>
                exclusive@gmail.com
                </p>
                <p  className='font-normal text-base'>
                +88015-88888-9999
                </p>
            </div>
            <div className="flex-[0_0_15%]">
                <p  className='text-xl font-medium mb-6'>
                Account
                </p>
                <p  className='font-normal text-base mb-4'>
                My Account
                </p>
                <p  className='font-normal text-base mb-4'>
                Login / Register
                </p>
                <p  className='font-normal text-base mb-4'>
                Cart
                </p>
                <p  className='font-normal text-base mb-4'>
                Wishlist
                </p>
                <p  className='font-normal text-base'>
                Shop
                </p>
            </div>
            <div className="flex-[0_0_15%]">
                <p  className='text-xl font-medium mb-6'>
                Quick Link
                </p>
                <p  className='font-normal text-base mb-4'>
                Privacy Policy
                </p>
                <p  className='font-normal text-base mb-4'>
                Terms Of Use
                </p>
                <p  className='font-normal text-base mb-4'>
                FAQ
                </p>
                <p  className='font-normal text-base'>
                Contact
                </p>
            </div>
            <div className="flex-[0_0_15%]">
                <p  className='text-xl font-medium mb-6'>
                Download App
                </p>
                <div className="download mt-6">
                    <p className='text-xs text-[#FAFAFA)] mb-2'>
                        Save $3 with App New User Only
                    </p>
                    <div className="flex">
                        <div className="qr-code">
                            <Image src={qrCode} alt='qr-code' width={76} height={76} />
                        </div>
                        <div className='app-on-phone flex flex-col ml-2'>
                            <Image src={chPlay} alt='ch-play' width={110} height={40} />
                            <Image src={appstore} alt='qr-code' width={110} height={40} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}