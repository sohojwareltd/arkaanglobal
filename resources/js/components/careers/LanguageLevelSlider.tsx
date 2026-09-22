import React, { useEffect, useId, useState } from 'react';

import { Label } from '@/components/ui/label';
import { LANGUAGE_LEVELS } from '@/lib/careers-utils';

const STEP_LABELS = ['Not set', ...LANGUAGE_LEVELS] as const;

interface LanguageLevelSliderProps {
    name: string;
    label: string;
    resetKey?: number;
}

export default function LanguageLevelSlider({
    name,
    label,
    resetKey = 0,
}: LanguageLevelSliderProps): JSX.Element {
    const id = useId();
    const [step, setStep] = useState(0);
    const [pulse, setPulse] = useState(false);

    const levelLabel = STEP_LABELS[step] ?? 'Not set';
    const progress = step === 0 ? 0 : (step / LANGUAGE_LEVELS.length) * 100;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setStep(Number(event.target.value));
        setPulse(true);
        window.setTimeout(() => setPulse(false), 320);
    };

    useEffect(() => {
        setStep(0);
    }, [resetKey]);

    return (
        <div className="intl-app-lang">
            <div className="intl-app-lang__head">
                <Label htmlFor={id} className="intl-app-lang__label">
                    {label}
                </Label>
                <span
                    className={`intl-app-lang__badge${pulse ? ' intl-app-lang__badge--pulse' : ''}`}
                    aria-live="polite"
                >
                    {levelLabel}
                </span>
            </div>
            <input type="hidden" name={name} value={step === 0 ? '' : LANGUAGE_LEVELS[step - 1]} />
            <div className="intl-app-lang__track-wrap">
                <div className="intl-app-lang__track">
                    <div
                        className="intl-app-lang__fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <input
                    id={id}
                    type="range"
                    className="intl-app-lang__slider"
                    min={0}
                    max={LANGUAGE_LEVELS.length}
                    step={1}
                    value={step}
                    onChange={handleChange}
                    aria-valuemin={0}
                    aria-valuemax={LANGUAGE_LEVELS.length}
                    aria-valuetext={levelLabel}
                />
            </div>
            <div className="intl-app-lang__ticks" aria-hidden="true">
                {STEP_LABELS.map((tick) => (
                    <span key={tick} className="intl-app-lang__tick">
                        {tick === 'Not set' ? '—' : tick.charAt(0)}
                    </span>
                ))}
            </div>
        </div>
    );
}
