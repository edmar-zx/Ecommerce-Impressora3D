import { useState, useEffect, useMemo } from 'react'
import { Produto } from '@/types/product'
import { ItemProduct } from './ItemProduct'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export function FeaturedProductsCarousel() {
    const [products, setProducts] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const featuredProducts = useMemo(
        () => products.filter(product => product.destaque),
        [products]
    )

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/produtos")

                if (!response.ok) throw new Error('Falha ao carregar produtos')

                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 sm:px-6 py-16">
                <div className="animate-pulse">
                    <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
                    <div className="flex gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex-1 h-96 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (featuredProducts.length === 0) {
        return null
    }

    return (
        <section className="" aria-labelledby="featured-products-title">
            <div className="rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">
                    Produtos em Destaque
                </h2>

                <div className="relative" role="region" aria-label="Carrossel de produtos em destaque">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        loop={featuredProducts.length >= 2}
                        spaceBetween={24}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="w-full"
                    >
                        {featuredProducts.map((product) => (
                            <SwiperSlide key={product._id}>
                                <ItemProduct
                                    produto={product}
                                    onAddToCart={() =>
                                        alert(`${product.nome} adicionado ao carrinho!`)
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        className="custom-prev absolute -left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 backdrop-blur-sm shadow-2xl p-3 rounded-full border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-105 group"
                        aria-label="Produtos anteriores"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                    </button>

                    <button
                        className="custom-next absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 backdrop-blur-sm shadow-2xl p-3 rounded-full border border-gray-200 hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-105 group"
                        aria-label="Próximos produtos"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                    </button>
                </div>
            </div>
        </section>
    )
}