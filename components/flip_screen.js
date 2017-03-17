export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="flip"
            className="large-frame"
            emitOnComplete={{
                name: 'flip',
            }}
        >
            <skoash.MediaSequence>
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}ThankYou.mp3`}
                    completeTarget="vo"
                    sprite={[0, 3500]}
                />
                <skoash.Audio
                    type="voiceOver"
                    src={`${CMWN.MEDIA.VO}ThankYou.mp3`}
                    sprite={[3500, 2000]}
                />
            </skoash.MediaSequence>
            <skoash.Component className="center">
                <skoash.Component className="group">
                    <skoash.Component className="frame" pl-bg>
                        <skoash.Image
                            className="fish"
                            src={`${CMWN.MEDIA.IMAGE}img_11.1.png`}
                        />
                        <skoash.Component>
                            <p>
                                Let me say thank you<br /> for cleaning up<br /> with a new
                            </p>
                            <skoash.Component
                                className={
                                    'flip-container' +
                                    (_.get(props, 'data.vo.complete', false) ? ' show' : '')
                                }
                            >
                                <skoash.Image
                                    className="flip"
                                    src={`${CMWN.MEDIA.IMAGE}img_11.2.png`}
                                />
                            </skoash.Component>
                        </skoash.Component>
                    </skoash.Component>
                </skoash.Component>
            </skoash.Component>
        </skoash.Screen>
    );
}

