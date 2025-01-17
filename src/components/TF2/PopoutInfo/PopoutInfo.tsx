import React, { ReactNode } from 'react';
import './PopoutInfo.css';
import { t } from '@i18n';

enum Teams {
  UNASSIGNED,
  SPEC,
  RED,
  BLU,
}
interface PopoutInfoProps {
  player: PlayerInfo;
  className?: string;
  children: ReactNode;
}

function calculateKD(kills: number = 0, deaths: number = 0): string {
  // No Kills, No KD
  if (!kills) return '0.00';
  // No Deaths but Kills, KD will always be Kills
  if (!deaths) return kills.toFixed(2);
  return (kills / deaths).toFixed(2);
}

const PopoutInfo = ({ player, className, children }: PopoutInfoProps) => {
  const [showPopout, setShowPopout] = React.useState(false);
  const [popoutPosition, setPopoutPosition] = React.useState({ left: 0 });
  const popoutRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    setShowPopout(true);

    // Calculate the left position based on the mouse position
    if (!player.gameInfo?.team) return;

    const gridContainer = document.querySelector(
      `.scoreboard-grid-half.${Teams[player.gameInfo?.team]}`,
    );
    if (gridContainer) {
      const gridRect = gridContainer.getBoundingClientRect();
      // -50 seems to perfectly center the popout next to the cursor
      const left = event.clientX - gridRect.left - 50;
      setPopoutPosition({ left });
    }
  };

  const handleMouseLeave = () => {
    setShowPopout(false);
  };

  const shouldRenderOptionsBelow = () => {
    if (!popoutRef.current) return true;
    const { top, height } = popoutRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - top - height - 200;
    return spaceBelow >= height;
  };

  const actualKD = calculateKD(player.gameInfo?.kills, player.gameInfo?.deaths);

  return (
    <div
      ref={popoutRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`popoutinfo-container ${className}`}
    >
      {children}
      {showPopout && (
        <div
          className={`popoutinfo-content ${
            shouldRenderOptionsBelow() ? 'below' : 'above'
          }`}
          style={{ left: popoutPosition.left, transform: 'translateX(-50%)' }}
        >
          <div>
            {t('KILLS')}: {player.gameInfo?.kills ?? 0}
          </div>
          <div>
            {t('DEATHS')}: {player.gameInfo?.deaths ?? 0}
          </div>
          <div>K/D: {actualKD}</div>
          <div>
            {t('PING')}: {player.gameInfo?.ping ?? 0}ms
          </div>
          <div>
            Bans:{' '}
            {(player.steamInfo?.gameBans ?? 0) +
              (player.steamInfo?.vacBans ?? 0)}
          </div>
          <div>
            {t('COUNTRY')}: {player.steamInfo?.countryCode ?? t('UNKNOWN')}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoutInfo;
