import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export default function ReadMore({ text, maxLength = 150, className = '' }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = text.length > maxLength;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={className}>
      <div
        className={`${!isExpanded && shouldShowButton ? 'line-clamp-3' : ''}`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {shouldShowButton && (
        <button
          onClick={toggleExpand}
          className='flex items-center text-red-600 hover:text-red-700 mt-2 text-sm font-medium'
        >
          {isExpanded ? (
            <>
              Sembunyikan <ChevronUp className='w-4 h-4 ml-1' />
            </>
          ) : (
            <>
              Baca selengkapnya <ChevronDown className='w-4 h-4 ml-1' />
            </>
          )}
        </button>
      )}
    </div>
  );
}
