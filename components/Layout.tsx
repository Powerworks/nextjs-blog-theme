import classNames from 'classnames';

import styles from './Layout.module.css';

export function GradientBackground({
  variant,
  className,
}: {
  variant: 'large' | 'small';
  className?: string;
}) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative pb-24">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
