import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  icon: ReactNode;
  variant?: 'default' | 'critical' | 'warning' | 'success';
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  variant = 'default',
  className 
}: StatsCardProps) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'critical':
        return 'border-critical/50 bg-critical/5';
      case 'warning':
        return 'border-warning/50 bg-warning/5';
      case 'success':
        return 'border-success/50 bg-success/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getIconColor = (variant: string) => {
    switch (variant) {
      case 'critical':
        return 'text-critical';
      case 'warning':
        return 'text-warning';
      case 'success':
        return 'text-success';
      default:
        return 'text-primary';
    }
  };

  return (
    <Card className={cn(
      'card-interactive',
      getVariantStyles(variant),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <div className={cn(
                "flex items-center text-sm",
                change.type === 'increase' ? 'text-critical' : 'text-success'
              )}>
                <span>{change.type === 'increase' ? '↗' : '↘'}</span>
                <span className="ml-1">{change.value}</span>
              </div>
            )}
          </div>
          <div className={cn(
            'p-3 rounded-lg',
            getIconColor(variant),
            variant !== 'default' ? 'bg-background/50' : 'bg-muted'
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};