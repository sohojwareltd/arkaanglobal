import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImageSliderProps {
    images: string[];
    title: string;
}

export default function ProjectImageSlider({ images, title }: ProjectImageSliderProps): JSX.Element | null {
    const [activeIndex, setActiveIndex] = useState(0);

    const goPrev = useCallback(() => {
        setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    }, [images.length]);

    const goNext = useCallback(() => {
        setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                goPrev();
            }
            if (event.key === 'ArrowRight') {
                goNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goPrev, goNext]);

    if (images.length === 0) {
        return null;
    }

    const paddedIndex = String(activeIndex + 1).padStart(2, '0');
    const paddedTotal = String(images.length).padStart(2, '0');

    return (
        <div className="project-slider project-slider--full">
            <div className="project-slider__display project-slider__display--square-edge">
                <img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt={`${title} — photo ${activeIndex + 1}`}
                    className="project-slider__img"
                />

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="project-slider__arrow project-slider__arrow--prev"
                            onClick={goPrev}
                            aria-label="Previous image"
                            data-cursor-hover
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            className="project-slider__arrow project-slider__arrow--next"
                            onClick={goNext}
                            aria-label="Next image"
                            data-cursor-hover
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="project-slider__counter">
                            <span>{paddedIndex}</span> / {paddedTotal}
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="project-slider__thumbs-wrap">
                    <div className="project-slider__thumbs">
                        {images.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className={`project-slider__thumb ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`View image ${index + 1}`}
                                data-cursor-hover
                            >
                                <img src={image} alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
