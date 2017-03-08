import classNames from 'classnames';

export default function (props, ref, key) {
    var starContainerClasses = classNames({
        'star-1': _.get(props, 'data.star-1.playing', false),
        'star-2': _.get(props, 'data.star-2.playing', false),
        'star-3': _.get(props, 'data.star-3.playing', false),
    }, 'stars-container');

    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="pollutes-water"
        >
            <skoash.Component className="center">
                <skoash.Component className="group">
                    <skoash.MediaSequence ref="media-sequence">
                        <skoash.Audio
                            ref="star-1"
                            type="sfx"
                            src={`${CMWN.MEDIA.EFFECT}Star1.mp3`}
                            playTarget="star-1"
                        />
                        <skoash.Audio
                            ref="star-2"
                            type="sfx"
                            src={`${CMWN.MEDIA.EFFECT}Star2.mp3`}
                            playTarget="star-2"
                        />
                        <skoash.Audio
                            ref="star-3"
                            type="sfx"
                            src={`${CMWN.MEDIA.EFFECT}Star3.mp3`}
                            playTarget="star-3"
                        />
                        <skoash.Audio
                            ref="vo-1"
                            type="voiceOver"
                            src={`${CMWN.MEDIA.VO}PollutesWater.mp3`}
                        />
                        <skoash.Audio
                            ref="vo-2"
                            type="voiceOver"
                            src={`${CMWN.MEDIA.VO}Remove.mp3`}
                        />
                    </skoash.MediaSequence>
                    <skoash.Component className="frame">
                        <skoash.Component className={starContainerClasses}>
                            <div className="stars" />
                        </skoash.Component>
                        <skoash.Image src={`${CMWN.MEDIA.IMAGE}img_8.1.png`} />
                        <p>
                            In this game remove everything<br /> that doesn't belong in the water.
                        </p>
                    </skoash.Component>
                </skoash.Component>
            </skoash.Component>
        </skoash.Screen>
    );
}

