import Selectable from 'shared/components/selectable/0.1';
import MediaCollection from 'shared/components/media_collection/0.1';

var playAudio = function (ref) {
    this.updateGameState({
        path: 'media',
        data: {
            play: ref
        }
    });
};

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="healthy-water"
        >
            <skoash.Audio
                ref="vo"
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}HealthyWater.mp3`}
            />
            <MediaCollection
                play={_.get(props, 'data.media.play', null)}
            >
                <skoash.Audio
                    ref="wrong"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Wrong.mp3`}
                    complete
                />
                <skoash.Audio
                    ref="right"
                    type="sfx"
                    src={`${CMWN.MEDIA.EFFECT}Right.mp3`}
                />
            </MediaCollection>
            <skoash.Component ref="center" className="center">
                <skoash.Component ref="group" className="group">
                    <skoash.Component ref="frame" className="frame">
                        <skoash.Image
                            ref="words"
                            className="words"
                            src={`${CMWN.MEDIA.IMAGE}img_4.1.png`}
                        />
                        <Selectable
                            ref="selectable"
                            onSelect={playAudio}
                            list={[
                                <skoash.ListItem data-ref="wrong" className="animated" />,
                                <skoash.ListItem data-ref="right" className="animated" correct />
                            ]}
                        />
                    </skoash.Component>
                </skoash.Component>
            </skoash.Component>
        </skoash.Screen>
    );
}

