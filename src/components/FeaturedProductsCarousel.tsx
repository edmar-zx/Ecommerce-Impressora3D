import { Produto } from '@/types/product'
import { useEffect, useState } from 'react'
import { ItemProduct } from './ItemProduct'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

export function FeaturedProductsCarousel() {
    const [allProducts, setAllProducts] = useState<Produto[]>([])
    const [onlyFeaturedProducts, setFeaturedProducts] = useState<Produto[]>([])

    const fetchProdutos = async () => {
        try {
            const res = await fetch("/api/produtos")
            const data = await res.json()
            if (res.ok) setAllProducts(data)
        } catch (err) {
            console.error("Erro ao buscar produtos:", err)
        }
    }

    const handleFeaturedProducts = () => {
        const filtratedProducts = allProducts.filter((product) => product.destaque)
        setFeaturedProducts(filtratedProducts)
    }

    useEffect(() => { fetchProdutos() }, [])
    useEffect(() => { handleFeaturedProducts() }, [allProducts])

    if (onlyFeaturedProducts.length === 0) {
        return null
    }

    return (
        <div className="relative w-full py-8 bg-gray-50">
            <div className="w-full max-w-[1800px] mx-auto px-8">
                <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        loop={true}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="w-full"
                    >
                        {onlyFeaturedProducts.map((product) => (
                            <SwiperSlide key={product._id}>
                                <div className="flex justify-center">
                                    <ItemProduct
                                        produto={product}
                                        onAddToCart={() =>
                                            alert(`${product.nome} adicionado ao carrinho!`)
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botões de navegação customizados */}
                    <button className="hover:cursor-pointer custom-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 transition hover:scale-105">
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button className="hover:cursor-pointer custom-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 transition hover:scale-105">
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </div>
        </div>
    )
}