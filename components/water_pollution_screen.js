import Repeater from 'shared/components/repeater/0.1';

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="water-pollution"
        >
            <skoash.Audio
                type="voiceOver"
                src={`${CMWN.MEDIA.VO}WaterPollution.mp3`}
            />
            <skoash.Component className="center">
                <skoash.Component className="group">
                    <skoash.Component className="frame" pl-bg>
                        <skoash.Image
                            className="words"
                            src={`${CMWN.MEDIA.IMAGE}img_3.1.png`}
                        />
                        <skoash.Image
                            className="fish"
                            src={`${CMWN.MEDIA.IMAGE}img_3.2.png`}
                        />
                    </skoash.Component>
                <Repeater className="bubbles" amount={14} />
                </skoash.Component>
            </skoash.Component>
        </skoash.Screen>
    );
}

