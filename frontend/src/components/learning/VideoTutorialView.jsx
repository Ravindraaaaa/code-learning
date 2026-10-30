import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '../common/Card.jsx';

export const VideoTutorialView = ({ video }) => {
  if (!video) return null;

  return (
    <Card className="rounded-2xl border-border-subtle bg-surface/90 p-6 sm:p-8 shadow-surface-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Verified Video Tutorial
            </span>
          </div>
          <h3 className="font-bold text-base sm:text-lg text-content-primary">
            {video.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-surface-elevated border border-border-subtle text-content-secondary">
            Channel: {video.channel}
          </span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-border-subtle hover:border-violet-500/50 hover:bg-surface-elevated text-content-muted hover:text-white transition-all"
            title="Open in new YouTube window"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className="text-xs text-content-muted leading-relaxed">
        {video.description}
      </p>

      {/* Embedded YouTube Player */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-subtle bg-black shadow-surface-md">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </Card>
  );
};

