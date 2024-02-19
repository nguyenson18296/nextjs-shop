"use client"
import React, { useCallback, useState } from "react";
import Image from "next/image";
import cx from 'classnames';

interface IProductDetailImages {
    product_name: string;
    image: string;
    images?: string[];
}

export const ProductDetailImages: React.FC<IProductDetailImages> = ({
    product_name,
    image,
    images
}) => {
    const [selectedImage, setSelectedImage] = useState(image);

    const listImages = [image].concat(images ?? ['']);

    const onSelectImage = useCallback((image: string) => {
        setSelectedImage(image);
    }, []);

    return (
        <div className="product-images flex-[0_0_20%]">
            <div className="product-big-image p-4 border border-1 border-[#e5e7eb]">
                <div className="h-[320px] flex items-center">
                    <Image
                        src={selectedImage}
                        alt={product_name}
                        width={300}
                        height={150}
                    />
                </div>
                <div className="flex items-center mt-4">
                    {listImages?.map((image, index) => (
                        <div
                            onClick={() => onSelectImage(image)}
                            key={index}
                            className={cx(
                                'p-1 border border-[#e5e7eb] ml-1 first:ml-0',
                                {
                                    'border-[#fb6e2e]': selectedImage === image
                                }
                            )}
                        >
                            <Image
                                src={image}
                                alt={image}
                                width={70}
                                height={30}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}