import Repeater from 'shared/components/repeater/0.1';

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="title"
            className="screen"
            checkComplete={false}
            completeDelay={2000}
            completeOnStart
        >
            <skoash.Image ref="background" className="fish animated" src={`${CMWN.MEDIA.IMAGE}img_1.1.png`} />
            <skoash.Image ref="title" className="title animated" src={`${CMWN.MEDIA.IMAGE}img_1.2.png`} />
            <Repeater ref="bubbles" className="bubbles" amount={14} />
        </skoash.Screen>
    );
}
