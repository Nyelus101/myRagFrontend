import { Loader } from 'lucide-react';



export function VectorSearchSkeleton({ className }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stat Card 1 Skeleton */}
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Stat Card 2 Skeleton */}
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Stat Card 3 Skeleton */}
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
      </div>

      <div className="w-full h-10 mt-2 bg-red-200 rounded-lg animate-pulse flex items-center justify-center " >
        <Loader className="w-6 h-6 animate-spin text-gray-600" />
      </div>

      {/* Recent Uploads Section Skeleton */}
      <div className="pt-4 border-t border-slate-100">
        <div className="h-3 w-24 bg-slate-200 rounded animate-pulse mb-3" />

        {/* File List Items Skeleton */}
        <ul className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
