import Image from "next/image";
import QuantityControl from "./QuantityControl";
import { CartItem } from "@/types/Products";
import { Heart, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ProductItemProps = {
  product: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function ProductItem({
  product,
  onIncrease,
  onDecrease,
  handleDelete,
}: ProductItemProps) {
  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-4 items-center py-4 text-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-200">
              <Image
                src={product.products.img_url}
                alt={product.products.name}
                width={56}
                height={56}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-1">
                {product.products.name}
              </h4>
              <p className="text-xs text-gray-500">
                {product.products.unit_value} {product.products.unit_label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition !border-0 cursor-pointer"
                >
                  <Trash2Icon size={18} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will delete "{product.products.name}" from your
                    cart
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(product.product_id)}
                    className="bg-red-500 hover:bg-red-400 cursor-pointer"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <button className="rounded-full p-2 text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition">
              <Heart size={18} />
            </button>
          </div>
        </div>

        <p className="pl-3 text-center">{formatCurrency(product.price)}</p>

        <div className="flex flex-col justify-center items-center gap-2">
          <QuantityControl
            quantity={Number(product.quantity)}
            onIncrease={() => onIncrease(product.product_id)}
            onDecrease={() => onDecrease(product.product_id)}
          />
        </div>

        <p className="pr-11 text-right font-semibold text-gray-800">
          {formatCurrency(product.price * Number(product.quantity))}
        </p>
      </div>

      <div className="lg:hidden flex flex-col gap-3 py-4 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start gap-3">
          <div className="bg-[#D9D9D9]/80 rounded-xl p-2 flex-shrink-0">
            <Image
              src={product.products.img_url}
              alt={product.products.name}
              width={56}
              height={56}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base sm:text-lg truncate">
              {product.products.name}
            </h4>
            <p className="text-sm sm:text-base text-gray-500 mt-0.5">
              {product.products.unit_value} {product.products.unit_label}
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 mt-2">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <QuantityControl
            quantity={Number(product.quantity)}
            onIncrease={() => onIncrease(product.product_id)}
            onDecrease={() => onDecrease(product.product_id)}
          />
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Subtotal</p>
            <p className="text-base sm:text-lg font-bold text-gray-800">
              {formatCurrency(product.price * Number(product.quantity))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
