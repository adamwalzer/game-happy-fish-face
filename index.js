import config from './config.game';

import Loader from 'shared/components/loader/0.1';

import iOSScreen from 'shared/components/ios_splash_screen/0.1';
import TitleScreen from './components/title_screen';
import YouFeelScreen from './components/you_feel_screen';
import WaterPollutionScreen from './components/water_pollution_screen';
import HealthyWaterScreen from './components/healthy_water_screen';
import CleanWaterScreen from './components/clean_water_screen';
import BubbleUpScreen from './components/bubble_up_screen';
import MultiBubblesScreen from './components/multi_bubbles_screen';
import PollutesWaterScreen from './components/pollutes_water_screen';
import TrashScreen from './components/trash_screen';
import FlipScreen from './components/flip_screen';

import QuitScreen from 'shared/components/quit_screen/0.1';

ENVIRONMENT.MEDIA_GAME = ENVIRONMENT.MEDIA + 'Games/HappyFishFace/';

// TODO: need BKG3 audio on media server AIM 12/15/16

skoash.start(
    <skoash.Game
        config={config}
        screens={{
            0: iOSScreen,
            1: TitleScreen,
            2: YouFeelScreen,
            3: WaterPollutionScreen,
            4: HealthyWaterScreen,
            5: CleanWaterScreen,
            6: BubbleUpScreen,
            7: MultiBubblesScreen,
            8: PollutesWaterScreen,
            9: TrashScreen,
            10: FlipScreen,
        }}
        menus={{
            quit: QuitScreen,
        }}
        getBackgroundIndex={index => {
            if (index === 0) return;
            if (index < 6) return 0;
            if (index < 9) return 1;
            return 2;
        }}
        loader={<Loader />}
        assets={[
            <skoash.Audio ref="bkg-1" type="background" src="media/_audio/_BKG/HFF_SX_BKG_1.mp3" loop />,
            <skoash.Audio
                ref="bkg-2"
                type="background"
                src={`${ENVIRONMENT.MEDIA_GAME}SoundAssets/effects/BKG1.mp3`} loop
            />,
            <skoash.Audio
                ref="bkg-3"
                type="background"
                src={`${ENVIRONMENT.MEDIA_GAME}SoundAssets/effects/BKG2.mp3`} loop
            />,
            <skoash.Audio
                ref="button"
                type="sfx"
                src={`${ENVIRONMENT.MEDIA_GAME}SoundAssets/effects/NextClick.mp3`}
            />,
            <skoash.Audio
                ref="screen-complete"
                type="sfx"
                src={`${ENVIRONMENT.MEDIA_GAME}SoundAssets/effects/NextAppear.mp3`}
            />,
            <skoash.Image
                ref="multibubbles-hidden"
                className="hidden"
                src={`${ENVIRONMENT.MEDIA_GAME}SpritesAnimations/IMG_7.1.png`}
            />,
            <skoash.Image
                ref="pollutants-hidden"
                className="hidden"
                src={`${ENVIRONMENT.MEDIA_GAME}SpritesAnimations/sprite.pollutant.png`}
            />,
            <skoash.Image
                ref="nonpollutants-hidden"
                className="hidden"
                src={`${ENVIRONMENT.MEDIA_GAME}SpritesAnimations/sprite.nonpollutant.png`}
            />,
            <div className="background garbage"></div>,
        ]}
        getClassNames={function () {
            var index = this.state.currentScreenIndex;
            if (index > 1 && index < 6) {
                return 'garbage';
            }
        }}
    />
);
