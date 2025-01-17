import React from 'react';
import './ScoreboardTable.css';

import { Player } from '@components/TF2';
import { Flex } from '@components/General';
import { t } from '@i18n';
interface ScoreboardTableProps {
  RED?: PlayerInfo[];
  BLU?: PlayerInfo[];
}

const ScoreboardTable = ({ BLU, RED }: ScoreboardTableProps) => {
  // Update the Scoreboard everytime a PFP is loaded
  const [, setLoadedPFPCount] = React.useState(0);

  const handlePFPImageLoad = () => {
    setLoadedPFPCount((prevCount) => prevCount + 1);
  };

  const renderTeam = (team?: PlayerInfo[], teamColor?: string) => {
    return (
      <div className={`scoreboard-grid-half ${teamColor}`}>
        <div className={`scoreboard-header ${teamColor?.toLowerCase()}`}>
          {teamColor} ({team?.length ?? 0})
        </div>
        <Flex className="scoreboard-nav">
          <div>{t('TEAM_NAV_RATING')}</div>
          <div>{t('TEAM_NAV_USER')}</div>
          <div>{t('TEAM_NAV_STATUS')}</div>
          <div>{t('TEAM_NAV_TIME')}</div>
        </Flex>
        <div className={`scoreboard-team ${teamColor?.toLowerCase()}`}>
          {team?.map((player) => (
            <Player
              className={teamColor?.toLowerCase()}
              player={player}
              key={player.steamID64}
              onImageLoad={handlePFPImageLoad}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="scoreboard-grid-container">
      {renderTeam(BLU, 'BLU')}
      <div className="scoreboard-divider" />
      {renderTeam(RED, 'RED')}
    </div>
  );
};

export default ScoreboardTable;
