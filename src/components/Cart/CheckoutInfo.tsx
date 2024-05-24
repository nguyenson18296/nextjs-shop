import React from "react";
import { useFormContext } from 'react-hook-form';
import cx from 'classnames';

export interface IFormValue {
  full_name: string;
  address: string;
  phone: string;
}

export const CheckoutInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<IFormValue>();

  return (
    <div className="flex-[0_0_30%] gi-checkout-wrap pb-[3px] pt-[12px] px-[8px] border-[1px] border-solid border-[#eee] bg-[#fff] rounded-[5px] mb-[40px]">
      <div className="gi-checkout-block gi-check-bill">
        <div className="gi-checkout-title leading-[1.2] text-[20px] font-semibold tracking-[0] relative block text-[#4b5966] font-Montserrat max-[575px]:text-[18px]">
          Thông tin hoá đơn
        </div>
        <form>
          <div className="gi-bill-wrap gi-bill-half w-full px-[15px] mb-[26px]">
            <label className="mb-[7px] text-[#4b5966] text-[15px] font-medium tracking-[0] leading-[1] inline-block">
              Họ tên
            </label>
            <input
              placeholder="Vui lòng nhập tên" 
              className={cx(
                "bg-transparent border-[1px] border-solid border-[#eee] text-[#4b5966] text-[14px] px-[15px] w-full outline-[0] rounded-[5px] h-[50px]",
                {
                  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700': Boolean(errors['full_name'])
                }
              )}
              {...register('full_name', { required: true })}
            />
            {Boolean(errors['full_name']) && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">Vui lòng không để trống.</p>
            )}
          </div>
          <div className="gi-bill-wrap gi-bill-half w-full px-[15px] mb-[26px]">
            <label className="mb-[7px] text-[#4b5966] text-[15px] font-medium tracking-[0] leading-[1] inline-block">
              Address
            </label>
            <input
              placeholder="Vui lòng nhập địa chỉ" 
              className="bg-transparent border-[1px] border-solid border-[#eee] text-[#4b5966] text-[14px] px-[15px] w-full outline-[0] rounded-[5px] h-[50px]"
              {...register('address', { required: true })}
            />
          </div>
          <div className="gi-bill-wrap gi-bill-half w-full px-[15px] mb-[26px]">
            <label className="mb-[7px] text-[#4b5966] text-[15px] font-medium tracking-[0] leading-[1] inline-block">
              Số điện thoại
            </label>
            <input 
              placeholder="Vui lòng nhập số điện thoại" 
              className="bg-transparent border-[1px] border-solid border-[#eee] text-[#4b5966] text-[14px] px-[15px] w-full outline-[0] rounded-[5px] h-[50px]"
              {...register('phone', { required: true })}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
