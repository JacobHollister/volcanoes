const defaultTransition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

export default function transition(delay = 0) {
    return {...defaultTransition, delay}
}