import Selectable from 'shared/components/selectable/0.1';
import MediaCollection from 'shared/components/media_collection/0.1';

var playAudio = function (ref) {
    this.updateGameState({
        path: 'media',
        data: {
            play: `children-${ref}`
        }
    });
};

var completeMC = function () {
    var self = this;
    setTimeout(() => {
        self.updateGameState({
            path: 'media',
            data: {
                complete: true
            }
        });
    }, 2000);
};

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="you-feel"
        >
            <skoash.Audio ref="vo" type="voiceOver"
                src={`${CMWN.MEDIA.VO}YouFeel.mp3`}
            />
            <MediaCollection
                play={_.get(props, 'data.media.play', null)}
                complete={_.get(props, 'data.media.complete', false)}
                onPlay={completeMC}
            >
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}LeftEmoji.mp3`}
                />
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}CenterEmoji.mp3`}
                />
                <skoash.Audio
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}RightEmoji.mp3`}
                />
            </MediaCollection>
            <skoash.Component ref="center" className="center">
                <skoash.Component ref="group" className="group">
                 <skoash.Component ref="frame" className="frame" pl-bg>
                        <skoash.Image ref="title"
                            src={`${CMWN.MEDIA.IMAGE}img_2.1.png`}
                        />
                        <Selectable
                            ref="selectable"
                            onSelect={playAudio}
                            chooseOne
                            list={[
                                <skoash.ListItem select className="animated img-0" />,
                                <skoash.ListItem select className="animated img-1" />,
                                <skoash.ListItem select className="animated img-2" />,
                            ]}
                        />
                    </skoash.Component>
                </skoash.Component>
            </skoash.Component>
        </skoash.Screen>
    );
}
